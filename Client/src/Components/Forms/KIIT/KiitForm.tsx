import Modal from "../../Modal"
import CustomForm from "../../CustomForm";
import { FormField } from "../../../Types";

const KiitForm = () => {

    const handleFormSubmit = (data: Record<string, any>) => {
        console.log('Form submitted:', data);
    };

    const handleFormChange = (data: Record<string, any>) => {
        console.log('Form data changed:', data);
    };

    const formFields: FormField[] = [
        { label: 'Admission Ref. No.', name: 'admissionNo', type: 'text', placeholder: 'Enter Admission Reference Number', disabled: false, size: 'lg' },
        { label: 'Student Name', name: 'studentName', type: 'text', placeholder: 'Enter Student name', disabled: false, size: 'lg' },
        { label: 'Relation', name: 'relation', type: 'select', options: ['Child', 'Child of Friend', 'Child of Relative', 'Other'], disabled: false, size: 'md' },
        { label: 'Department', name: 'department', type: 'select', options: ['ITI', 'Polytechnique', 'Engineering'], disabled: false, size: 'md' },
        { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your address', disabled: false, size: 'md' },
        { label: 'City', name: 'city', type: 'text', placeholder: 'Enter your city', disabled: false, size: 'md' },
        { label: 'State', name: 'state', type: 'text', placeholder: 'Enter your state', disabled: false, size: 'md' },
        { label: 'Pincode', name: 'pincode', type: 'text', placeholder: 'Enter your pincode', disabled: false, size: 'md' },
        { label: 'EmailId', name: 'email', type: 'email', placeholder: 'Enter your email', disabled: false, size: 'md' },
        { label: 'Mobile', name: 'mobile', type: 'text', placeholder: 'Enter your mobile number', disabled: false, size: 'sm' },
        { label: 'Amount', name: 'amount', type: 'text', placeholder: 'Enter the amount paid', disabled: false, size: 'sm' },
    ];



    const initialValues = {
        admissionNo: '',
        studentName: '',
        relation: 'Child',
        department: 'ITI',
        address: '',
        password: '',
        bio: '',
        role: 'Admin',
    }

    return (
        <div>
            <Modal buttonText="Add">
                <CustomForm title="Add Candidates" fields={formFields} onSubmit={handleFormSubmit} onChange={handleFormChange} initialValues={initialValues} />
            </Modal>

        </div>
    )
}

export default KiitForm