-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "statusenabled" BOOLEAN NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "phonenumber" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_owners" (
    "id" SERIAL NOT NULL,
    "statusenabled" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "daily_rental_price" INTEGER NOT NULL,
    "merk" VARCHAR(255),
    "year" VARCHAR(4),
    "license_plate" VARCHAR(10),

    CONSTRAINT "cars_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "statusenabled" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cars_owner_id" INTEGER NOT NULL,
    "pickup" VARCHAR(255),
    "dropof" VARCHAR(255),
    "pickup_date" TIMESTAMPTZ(3) NOT NULL,
    "dropof_date" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cars_owners" ADD CONSTRAINT "cars_owners_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_cars_owner_id_fkey" FOREIGN KEY ("cars_owner_id") REFERENCES "cars_owners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
