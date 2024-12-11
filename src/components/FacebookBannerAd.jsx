const FacebookBannerAd = () => {
    return (
        <div className="fb-ad">
            <iframe
                src="https://www.facebook.com/adnw_request?placement=YOUR_PLACEMENT_ID"
                // src="https://sample.clas.ufl.edu/iframe-url-test/"
                title="myint"
                style={{
                    border: 'none',
                    overflow: 'hidden',
                    width: '300px', // Ad size
                    height: '250px'
                }}
                scrolling="no"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default FacebookBannerAd;