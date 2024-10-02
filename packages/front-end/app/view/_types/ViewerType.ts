import { SessionResponseDto } from "@/schema/backend.schema";

export interface ViewerPropType extends SessionResponseDto {
  userId: number;
}
