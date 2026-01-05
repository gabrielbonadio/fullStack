import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from './organizations.model';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/organizations';

    list(): Observable<Organization[]> {
        return this.http.get<Organization[]>(this.apiUrl);
    }

    create(org: { name: string; email: string }): Observable<Organization> {
        return this.http.post<Organization>(this.apiUrl, org);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    update(id: string, org: { name: string; email: string }): Observable<Organization> {
        return this.http.put<Organization>(`${this.apiUrl}/${id}`, org);
    }
}