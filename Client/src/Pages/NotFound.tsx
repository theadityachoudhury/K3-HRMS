import config from "../Config"
import PageMeta from "../Utils/pageMeta"

const NotFound = () => {
    return (
        <div className="justify-center items-center flex h-screen">
        <PageMeta title={`${config.APP_NAME} | Not Found`} description={`${config.APP_NAME} | Not Foubd Page`} />

            <p className="text-4xl text-center">
                404 Page Not Found
            </p>
        </div>
    )
}

export default NotFound