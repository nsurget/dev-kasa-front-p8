import React from "react";
import Container from "@/components/Container";
import PropertyDetailClient from "@/components/PropertyDetailClient";
import { Property } from "../../../../types/property";

export const dynamic = "force-dynamic";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getPropertyDetails(id: string): Promise<Property> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${backendUrl}/api/properties/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch property details for ID: ${id}. Status: ${res.status}`);
  }

  return res.json();
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  let property: Property | null = null;
  let errorMsg: string | null = null;

  try {
    property = await getPropertyDetails(id);
  } catch (err) {
    console.error("Error fetching property details:", err);
    errorMsg = err instanceof Error ? err.message : "Une erreur inconnue est survenue.";
  }

  return (
    <Container className="py-8">
      {errorMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
          <span className="font-semibold">Erreur:</span> {errorMsg}
        </div>
      )}
      {property && <PropertyDetailClient property={property} />}
    </Container>
  );
}
