import KIITTable from "../Components/Forms/KIIT/KIITTable"
import KiitForm from "../Components/Forms/KIIT/KiitForm"
import PageMeta from "../Utils/pageMeta"

const Kiit = () => {
    return (
        <div className="">
            <PageMeta title="KIIT Admissions" description="KIIT Admission"/>
            <div className="text-xl m-10 sm:mx-20">
                <div className="flex space-x-2">
                    <h1 className="font-bold text-3xl flex-grow">KIIT Admission Details</h1>
                    <KiitForm />
                </div>

                <div className="mt-2">
                    <hr />
                </div>

                <div>
                    <KIITTable />
                </div>
            </div>
        </div>
    )
}

export default Kiit