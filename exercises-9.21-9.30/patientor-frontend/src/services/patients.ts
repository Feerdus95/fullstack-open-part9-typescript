import axios from "axios";
import { Patient, Entry, BaseEntry } from "../types/patient";
import { PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

export type EntryWithoutId = Omit<BaseEntry, 'id'> & {
  type: Entry['type'];
};


const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (patientId: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );
  return data;
};

export default {
  getAll, getById, create, createEntry
};

