//500 page
export default function Error500 () {
    return (
        <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span className="block text-6xl font-bold mb-1">500</span>
                <div className="text-6xl text-primary font-bold mb-3">Bad Request</div>
                <p className="mt-0 mb-4 text-700 line-height-3">The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, too large size, invalid request payload, or deceptive request routing).</p>
            </section>
        </div>
        </div>
    );

}