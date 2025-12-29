import { httpRequest } from "../api/http-Client";
import { HTTP_METHOD } from "../enums";
import type {
  AddDepartmentRequest,
  UpdateDepartmentRequest,
} from "../interfaces";

const DEPARTMENT_URL = "department";

export async function getAllDepartments<T>() {
  const url = `${DEPARTMENT_URL}/get-departments`;
  return httpRequest<T>(url, HTTP_METHOD.GET);
}

export async function getAllDepartmentsSearched<T>(search: string) {
  const url = `${DEPARTMENT_URL}?&search=${search}`;
  return httpRequest<T>(url, HTTP_METHOD.GET);
}

export async function addDepartment<T>(payload: AddDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/add-department`;
  return httpRequest<T>(url, HTTP_METHOD.POST, payload);
}

export async function getDepartmentById<T>(id: number) {
  const url = `${DEPARTMENT_URL}/get-department-by-id/${id}`;
  return httpRequest<T>(url, HTTP_METHOD.GET);
}

export async function updateDepartment<T>(payload: UpdateDepartmentRequest) {
  const url = `${DEPARTMENT_URL}/update-department`;
  return httpRequest<T>(url, HTTP_METHOD.PUT, payload);
}

export async function deleteDepartment<T>(id: number) {
  const url = `${DEPARTMENT_URL}/delete-department/${id}`;
  return httpRequest<T>(url, HTTP_METHOD.DELETE);
}
