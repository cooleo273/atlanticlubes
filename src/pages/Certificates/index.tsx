import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

// Example certificate data
const certificates = [
    { category: "International Certifications & Accreditation", items: [
        { name: "API Certificate", pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/12/EOLCS-Certificate-ATLANTIC-GREASE-LUBRICANTS-FZC-04-Jan-2024.pdf", imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/12/EOLCS-Certificate-ATLANTIC-GREASE-LUBRICANTS-FZC-04-Jan-2024.jpg" },
        { name: "ISO 14001-2015 ENVIRONMENTAL MANAGEMENT SYSTEM", pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/ISO-14001-2015-UPTO-SEP-2027.pdf", imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/ISO-14001-2015-UPTO-SEP-2027.jpg" },
        { name: "ISO 17025 Accreditation Certificate", pdfLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/05-ISO-17025-2017-Atlantic-Grease-Lubricants-FZC-LB-TEST-095.pdf", imgLink: "https://atlanticlubes.com/wp-content/uploads/2023/11/05-ISO-17025-2017-Atlantic-Grease-Lubricants-FZC-LB-TEST-095.jpg" },
        // Add more as needed...
    ]},
    { category: "Deutz Approval", items: [
        { name: "DEUTZ DQC III-18 LA-Atlantic Super Top Fleet HD V 15W40 CK4", pdfLink: "/certificates/Deutz_DQC_III_18_LA.pdf", imgLink: "/images/Deutz_DQC_III_18_LA.jpg" },
        // Add more as needed...
    ]},
    // Add more categories and certificates as needed...
];

const CertificatesPage: React.FC = () => {
    const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

    const openModal = (certificate: any) => {
        setSelectedCertificate(certificate);
    };

    const closeModal = () => {
        setSelectedCertificate(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Certificates</h1>
            {certificates.map((category, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-bold mb-3">{category.category}</h2>
                    <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-center justify-between border-b pb-2">
                                <button onClick={() => openModal(item)} className="text-blue-500 bg-white hover:text-white">
                                    {item.name} Image
                                </button>
                                <a href={item.pdfLink} download className="text-blue-500  hover:text-blue-700">
                                    PDF Download
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Modal for image preview using Headless UI */}
            <Dialog open={!!selectedCertificate} onClose={closeModal} className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <Dialog.Panel className="bg-white p-4 rounded-md w-full max-w-md">
                    {selectedCertificate && (
                        <>
                            <img src={selectedCertificate.imgLink} alt={selectedCertificate.name} className="w-full h-auto mb-4" />
                            <div className="flex justify-end gap-4">
                                <a
                                    href={selectedCertificate.imgLink}
                                    download
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Download Image
                                </a>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </>
                    )}
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default CertificatesPage;