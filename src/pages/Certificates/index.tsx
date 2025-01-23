import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

// Example certificate data
const certificates = [
  {
    category: "International Certifications & Accreditation",
    items: [
      {
        name: "API Certificate",
        pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/12/EOLCS-Certificate-ATLANTIC-GREASE-LUBRICANTS-FZC-04-Jan-2024.pdf",
        imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/12/EOLCS-Certificate-ATLANTIC-GREASE-LUBRICANTS-FZC-04-Jan-2024.jpg",
      },
      {
        name: "ISO 14001-2015 ENVIRONMENTAL MANAGEMENT SYSTEM",
        pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/ISO-14001-2015-UPTO-SEP-2027.pdf",
        imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/ISO-14001-2015-UPTO-SEP-2027.jpg",
      },
      {
        name: "ISO 17025 Accreditation Certificate",
        pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/05-ISO-17025-2017-Atlantic-Grease-Lubricants-FZC-LB-TEST-095.pdf",
        imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/05-ISO-17025-2017-Atlantic-Grease-Lubricants-FZC-LB-TEST-095.jpg",
      },
    ],
  },
  {
    category: "Deutz Approval",
    items: [
      {
        name: "DEUTZ DQC III-18 LA-Atlantic Super Top Fleet HD V 15W40 CK4",
        pdfLink: "/certificates/Deutz_DQC_III_18_LA.pdf",
        imgLink: "/images/Deutz_DQC_III_18_LA.jpg",
      },
    ],
  },
];

const CertificatesPage: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const openModal = (certificate: any) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  const handleDownload = (link: string, filename: string) => {
    try {
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 w-2/3">
        <h1 className="text-2xl font-semibold mb-4 px-4">Certificates</h1>
        {certificates.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-bold mb-3 px-4">{category.category}</h2>
            <ul className="space-y-2 w-2/3 lg:w-full">
              {category.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex flex-col lg:flex-row items-center justify-between border-b pb-2 gap-2"
                >
                  <button
                    onClick={() => openModal(item)}
                    className="text-black bg-white  hover:underline hover:bg-white py-2 px-4 rounded-md"
                  >
                    {item.name} Image
                  </button>
                  <button
                    onClick={() => handleDownload(item.pdfLink, `${item.name}.pdf`)}
                    className=" bg-white text-black hover:text-orange-500 hover:bg-white hover:underline py-2 px-4 rounded-md"
                  >
                    PDF Download
                  </button> 
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Modal for image preview */}
        <Dialog
          open={!!selectedCertificate}
          onClose={closeModal}
          className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-75"
        >
          <Dialog.Panel className="bg-white p-4 rounded-md w-full max-w-md">
            {selectedCertificate && (
              <>
                <img
                  src={selectedCertificate.imgLink}
                  alt={selectedCertificate.name}
                  className="w-full h-auto mb-4"
                />
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <a
                    href={selectedCertificate.imgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1 bg-white text-black border rounded hover:bg-black hover:text-white text-center"
                  >
                    View
                  </a>
                  <button
                    onClick={() =>
                      handleDownload(selectedCertificate.imgLink, `${selectedCertificate.name}.jpg`)
                    }
                    className="px-4 py-1 bg-black text-white rounded hover:bg-white hover:text-black hover:border text-center"
                  >
                    Download
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-700 text-center"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
};

export default CertificatesPage;
