"use client";
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react'

function MapPage() {

  const Map = useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return <Map/>;
}

export default MapPage;