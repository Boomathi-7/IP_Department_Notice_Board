import { Schema, model } from "mongoose";

export interface NoticeDocument {
  title: string;
  message: string;
}

const noticeSchema = new Schema<NoticeDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export const Notice = model<NoticeDocument>("Notice", noticeSchema);

