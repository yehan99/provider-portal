import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PatientServiceService {
  url = "http://localhost:8000/patients";
  constructor(private httpClient: HttpClient) {}

  PatientDetails() {
    return this.httpClient.get<any[] | any>("http://localhost:8000/patients");
  }

  SavePatient(data: any) {
    return this.httpClient.post("http://localhost:8000/patients", data);
  }

  DeletePatient(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
