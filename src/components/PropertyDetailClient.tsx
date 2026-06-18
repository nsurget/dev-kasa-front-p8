"use client";

import React from "react";
import { Property } from "../../types/property";

type PropertyDetailClientProps = {
  property: Property;
};

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  return (
    <div className="p-8 font-mono bg-gray-50 rounded-lg border border-gray-200 overflow-auto">
      <h2 className="text-xl font-bold mb-4 font-sans text-gray-800">Détails de la propriété (JSON Dump)</h2>
      <pre className="text-xs text-gray-700 bg-white p-4 rounded border border-gray-100 whitespace-pre-wrap break-all">
        {JSON.stringify(property, null, 2)}
      </pre>
    </div>
  );
}
