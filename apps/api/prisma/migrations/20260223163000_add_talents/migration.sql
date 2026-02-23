-- CreateTable
CREATE TABLE "Talent" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "sector" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Talent_sector_idx" ON "Talent"("sector");

-- CreateIndex
CREATE INDEX "Talent_location_idx" ON "Talent"("location");
