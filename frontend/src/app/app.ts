import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { OrganizationService } from './organization/organizations.service';
import { Organization } from './organization/organizations.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  private organizationService = inject(OrganizationService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  organizations = signal<Organization[]>([]);
  search = signal<string>('');

  filteredOrganizations = computed(() => {
    const term = this.search().toLowerCase();
    return this.organizations().filter(org => 
      org.name.toLowerCase().includes(term) || 
      org.email.toLowerCase().includes(term)
    );
  });

  editingId: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.organizationService.list()
      .subscribe({
        next: (data) => this.organizations.set(data),
        error: () => this.toastr.error('Erro ao carregar dados do servidor')
      });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }

  save() {
    if (this.form.invalid) {
      this.toastr.warning('Por favor, preencha o formulário corretamente');
      return;
    }

    const orgData = {
      name: this.form.value.name!,
      email: this.form.value.email!
    };

    if (this.editingId) {
      this.organizationService.update(this.editingId, orgData).subscribe({
        next: () => {
          this.toastr.success('Organização atualizada com sucesso!');
          this.resetForm();
          this.loadData();
        },
        error: () => this.toastr.error('Erro ao atualizar organização')
      });
    } else {
      this.organizationService.create(orgData).subscribe({
        next: () => {
          this.toastr.success('Organização criada com sucesso!');
          this.resetForm();
          this.loadData();
        },
        error: () => this.toastr.error('Erro ao criar organização')
      });
    }
  }

  edit(org: Organization) {
    this.editingId = org.id;
    this.form.patchValue({ name: org.name, email: org.email });
    this.toastr.info('Modo de edição ativado');
  }

  remove(id: string) {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    
    this.organizationService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Removido com sucesso');
        this.loadData();
      },
      error: () => this.toastr.error('Não foi possível remover')
    });
  }

  resetForm() {
    this.form.reset();
    this.editingId = null;
  }
}