-- CreateTable
CREATE TABLE "ShipmentEvent" (
    "event_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipment_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ShipmentEvent_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "Shipment" ("shipment_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ShipmentEvent_shipment_id_idx" ON "ShipmentEvent"("shipment_id");
