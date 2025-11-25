-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN "carrier" TEXT;
ALTER TABLE "Shipment" ADD COLUMN "delivery_date" DATETIME;
ALTER TABLE "Shipment" ADD COLUMN "tracking_number" TEXT;
