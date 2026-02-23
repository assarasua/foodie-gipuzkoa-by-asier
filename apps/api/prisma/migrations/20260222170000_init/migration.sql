-- CreateTable
CREATE TABLE "Category" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "emoji" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "titleEs" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "descriptionEs" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "nameEs" TEXT NOT NULL,
  "nameEn" TEXT NOT NULL,
  "specialtyEs" TEXT NOT NULL,
  "specialtyEn" TEXT NOT NULL,
  "descriptionEs" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "locationLabel" TEXT NOT NULL,
  "priceTier" INTEGER NOT NULL,
  "ratingAsier" INTEGER,
  "isYoungTalent" BOOLEAN NOT NULL DEFAULT false,
  "age" INTEGER,
  "mapUrl" TEXT,
  "websiteUrl" TEXT,
  "imageUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");

-- CreateIndex
CREATE INDEX "Restaurant_categoryId_idx" ON "Restaurant"("categoryId");

-- CreateIndex
CREATE INDEX "Restaurant_city_idx" ON "Restaurant"("city");

-- CreateIndex
CREATE INDEX "Restaurant_isPublished_idx" ON "Restaurant"("isPublished");

-- AddForeignKey
ALTER TABLE "Restaurant"
ADD CONSTRAINT "Restaurant_categoryId_fkey"
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
