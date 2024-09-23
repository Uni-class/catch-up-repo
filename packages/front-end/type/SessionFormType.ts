import { File } from "@/schema/backend.schema";

export interface SessionFormType {
  sessionName: string;
  sessionFiles: File[];
}
