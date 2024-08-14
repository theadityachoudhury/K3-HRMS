import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

interface ModalProps {
    buttonText: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ buttonText, children }) => {
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);

    const handleKeys = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    const openModal = () => {
        setShowModal(true);
        setTimeout(() => {
            setAnimateModal(true);
        }, 10); // slight delay to trigger animation
    }

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setShowModal(false);
        }, 300); // match this duration with the animation duration
    }

    return (
        <div onKeyDown={handleKeys}>
            <div>
                <button
                    onClick={openModal}
                    title="Add Candidate"
                    className="flex space-x-1 text-white transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded-md text-sm">
                    <p className="font-medium">{buttonText}</p>
                    <CirclePlus size={20} color="#ffffff" strokeWidth={2.25} />
                </button>
            </div>

            {showModal && (
                <div
                    className={`fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen transition-opacity duration-300 ${animateModal ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeModal}
                >
                    <div
                        className={`bg-white rounded-md shadow-md p-8 mx-auto my-20 w-3/4 max-h-[80vh] overflow-y-auto transform transition-transform duration-300 ${animateModal ? 'translate-y-0' : '-translate-y-10'}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='text-right'>
                            <button className='bg-red-500 px-2 text-md text-white hover:bg-red-600 rounded-md' onClick={closeModal}>X</button>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
