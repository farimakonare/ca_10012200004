-- AlterTable
ALTER TABLE "Payment" ADD COLUMN "proof_image" TEXT;
ALTER TABLE "Payment" ADD COLUMN "proof_reviewed_at" DATETIME;
ALTER TABLE "Payment" ADD COLUMN "proof_uploaded_at" DATETIME;
