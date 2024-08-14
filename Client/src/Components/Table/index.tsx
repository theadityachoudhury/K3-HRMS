interface IndexProps {
    columnNames: string[];
    rows: { [key: string]: string }[];
    isAction: boolean;
    actions: { [key: string]: (...args: any[]) => any }; // Changed to handle varying number of parameters
}

const Index: React.FC<IndexProps> = ({ columnNames, rows, isAction, actions }) => {
    return (
        <div className="overflow-x-auto">
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
                                            onClick={() => actions[actionKey](row, rowIndex)} // Pass row and index as arguments
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
        </div>
    );
};


export default Index;