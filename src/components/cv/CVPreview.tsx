import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';

export default function CVPreview({ profile, experiences, contact, lang = 'en', ui }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="p-8 text-white h-screen flex items-center justify-center">Loading PDF viewer...</div>;
  }

  return (
    <div className="w-full h-screen">
      <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }}>
        <CVDocument profile={profile} experiences={experiences} contact={contact} lang={lang} ui={ui} />
      </PDFViewer>
    </div>
  );
}
