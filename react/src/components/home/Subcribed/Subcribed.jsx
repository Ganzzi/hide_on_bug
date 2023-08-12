import React, { useEffect, useState } from "react";
import { formatDateTime, limitText } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../utils/axios";

const Subcribed = () =>
{
    const { providerId } = useParams();
    const [provider, setProvider] = useState(null);
    const [films, setfilms] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [subscribedCount, setSubscribedCount] = useState(0);
    const [expireDateCurrent, setExpireDateCurrent] = useState(null);
    const [expireDate, setExpireDate] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>
    {
        const getWatlistVideo = async () =>
        {
            await axiosClient
                .get(`providers/${providerId}`)
                .then(({ data }) =>
                {
                    setProvider(data.provider);
                    setfilms(data.films);
                    setSubscribed(data.subscribed);
                    setSubscribedCount(data.subscribed_user_count);
                    setExpireDateCurrent(data.subscription_expiry_date);
                    setExpireDate(data.subscription_expiry_date);
                });
        };

        getWatlistVideo();
    }, [providerId]);

    const formatDate = (date) =>
    {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleExtendSubscription = async () =>
    {
        await axiosClient
            .post("updatepay", {
                provider_id: providerId,
            })
            .then(() =>
            {
                const newExpireDate = new Date(expireDate);
                newExpireDate.setMonth(newExpireDate.getMonth() + 1);
                // console.log(newExpireDate);
                setExpireDate(formatDate(newExpireDate));
            });
    };

    const handleSubscribeOrUnSubcribe = async () =>
    {
        await axiosClient
            .post("subcribeOrUnsubcribe", {
                provider_id: providerId,
            })
            .then(() =>
            {
                if (subscribed)
                {
                    setExpireDate(expireDateCurrent);
                }
                setSubscribed(!subscribed);
            });
    };

    return (
        <div
            className="home-container "
            style={{
                color: "white",
            }}
        >
            <div className="d-flex flex-column  justify-content-center  my-3 rounded-top backgr ">
                <div className="d-flex flex-row  m-3">
                    <img
                        className="ChannelImg border border-info shadow p-2 bg-light "
                        src={
                            `http://127.0.0.1:8001/api/images/` +
                            provider?.provider_logo
                        }
                        alt=""
                    />
                    <div className="horizontal-container">
                        <h3 className="mt-4 text-danger">
                            {provider?.provider_name}
                        </h3>
                        <div className="figcaption-container">
                            {provider?.created_at && (
                                <figcaption className="blockquote-footer mt-4">
                                    Attended in
                                    <cite title="Source Title">
                                        {formatDateTime(provider.created_at)}
                                    </cite>
                                </figcaption>
                            )}
                            <figcaption className="blockquote-footer mt-2">
                                Subscribers:{" "}
                                <cite title="Source Title">
                                    {subscribedCount} Subcribers
                                </cite>
                            </figcaption>
                            <figcaption className="blockquote-footer mt-2">
                                Videos:{" "}
                                <cite title="Source Title">{films.length}</cite>
                            </figcaption>

                            <button
                                className="btn btn-danger"
                                onClick={handleSubscribeOrUnSubcribe}
                            >
                                {!subscribed ? "Subcribe" : "Unsubcribe"}
                            </button>
                        </div>
                        {subscribed && (
                            <div className="d-flex flex-row">
                                <p>Expire Date: {expireDate}</p>
                                <button
                                    onClick={handleExtendSubscription}
                                    className="btn btn-primary"
                                >
                                    Extend Subscription
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column  justify-content-center align-items-center my-3 rounded-top z-index backgr">
                <h3 className="mt-4 text-light lead">Videos</h3>

                {/* Video place */}
                {films.length != 0 ? (
                    <div className="row row-cols-4 g-2 m-3">
                        {films.map((film, index) => (
                            <div
                                className="col"
                                key={index}
                                onClick={() => navigate("/video/" + film.id)}
                            >
                                <div className="card">
                                    <img
                                        src={
                                            `http://127.0.0.1:8001/api/images/` +
                                            film?.film_poster
                                        }
                                        className="card-img-top"
                                        alt="Hollywood Sign on The Hill"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {film?.film_name}
                                        </h5>
                                        <p className="card-text">
                                            {limitText(
                                                "  This is a longer card with supporting text below as a natural lead-in",
                                                100
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1 style={{ color: "white" }}>none film at all</h1>
                )}
            </div>
        </div>
    );
};

export default Subcribed;
