import config from "../../Config"

const index = () => {
    return (
        <div className="mt-36">

            <hr />
            <div className="m-5 text-center">
                <p>Made with ❤️ by 1CH311X301</p>
                <p className="">© {new Date().getFullYear()} <a className="text-indigo-500 hover:text-indigo-700" href={config.FRONTEND_URL}>{config.APP_NAME}</a> All rights reserved.</p>
            </div>
        </div>
    )
}

export default index