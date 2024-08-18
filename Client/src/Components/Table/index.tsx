// Table.tsx (Index Component)
import React, { useEffect, useState } from 'react';

interface IndexProps {
    columnNames: string[];
    rows: { [key: string]: string }[];
    isAction: boolean;
    actions: { [key: string]: (...args: any[]) => any };
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
}

const Index: React.FC<IndexProps> = ({ columnNames, rows, isAction, actions, totalPages, currentPage, onPageChange, isLoading }) => {
    return (
        <div className="overflow-x-auto">
            {isLoading ? (
                <div className="text-center py-5">Loading...</div>
            ) : rows.length === 0 ? (
                <div className="text-center py-5">No Data Found</div>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            {columnNames.map((name, index) => (
                                <th key={index} className="py-3 px-6 text-left">
                                    {name}
                                </th>
                            ))}
                            {isAction && <th className="py-3 px-6 text-left">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-medium">
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-100">
                                {columnNames.map((col, colIndex) => (
                                    <td key={colIndex} className="py-3 px-6 text-left whitespace-nowrap">
                                        {row[col]}
                                    </td>
                                ))}
                                {isAction && (
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {Object.keys(actions).map((actionKey, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                onClick={() => actions[actionKey](row, rowIndex)}
                                                className="mr-2 text-blue-500 hover:text-blue-700"
                                            >
                                                {actionKey}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 my-5">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onPageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Index;
