import React, { useEffect, useState } from "react";
import "./PackageApproval.css";
import axios from "axios";
import { BackendURL } from "../../BackendContext";

const PackageApproval = ({ user }) => {

  const API = BackendURL();
  const [rejectedRemarks, setRemarks] = useState("");

  const [seeDetails, setSeeDetails] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const [approvalDetails, setApprovalDetails] = useState();
  const [rejectedDetails, setRejectedDetails] = useState();
  const [payementDetails, setPaymentDetails] = useState();

  const pendingApprovals =
    approvalDetails?.length === 0
      ? 0
      : approvalDetails?.map((approval) => approval.packageDetails?.length);

  useEffect(() => {
    axios
      .get(`${API}/Cart/GetCartDetailsForProvider/${user._id}`)
      .then((response) => setApprovalDetails(response.data))
      .catch((error) =>
        console.error("Getting Error in Package Details in Cart" + error)
      );

    axios
      .get(`${API}/Cart/GetRejectedPackageDetails/${user._id}`)
      .then((response) => setRejectedDetails(response.data))
      .catch((error) =>
        console.error(
          "Getting error in getting rejected package details: " + error
        )
      );

    axios
      .get(`${API}/Provider/GetReceiptForProvider/${user._id}`)
      .then((response) => setPaymentDetails(response.data))
      .catch((error) =>
        console.error("Getting error in retrieving payment details" + error)
      );
  }, [user._id]);

  const handleApprove = (cartID) => {
    axios
      .put(`${API}/Cart/PackageApprovalFromProvider/${cartID}`)
      .then((response) => alert(response.data.message))
      .catch((error) =>
        console.error("Getting Error in Approving Package" + error)
      );
  };

  const Submit = (packageID, userID) => {
    if (rejectedRemarks) {
      axios
        .post(
          `${API}/Cart/PackageRejectFromProvider/${user._id}/${packageID}/${userID}`,
          { rejectedRemarks }
        )
        .then((response) => alert(response.data.message))
        .catch((error) =>
          console.error("Getting error in rejecting package: " + error)
        );
    } else alert("Please Enter Remarks In Order To Reject Package");
  };

  const Acknowledge = (transactionID) => {
    axios
      .put(
        `${API}/Provider/PaymentAcknowledgement/${transactionID}`
      )
      .then((response) => alert(response.data.message))
      .catch((error) =>
        console.error("Getting error in acknowledgement" + error)
      );
  };

  return (
    <React.Fragment>
      <div className="main-box" style={{ width: "82vw", float: "right" }}>
        <div className="stats">
          <div>
            <h3>12</h3>
            <p>Approved Packages</p>
          </div>
          <hr />
          <div>
            <h3>{rejectedDetails?.length}</h3>
            <p>Rejected Packages</p>
          </div>
          <hr />
          <div>
            <h3>{pendingApprovals}</h3>
            <p>Pening Approvals</p>
          </div>
        </div>

        <div
          className="sections-box"
          style={{ width: "90%", maxHeight: "432px" }}
        >
          <h2>Packages History</h2>
          <div
            className="packages-box"
            style={{ padding: "0 24px", overflowY: "auto", gap: "1.5rem" }}
          >
            {rejectedDetails?.map((details) => (
              <div className="rejected-package-box" key={details._id}>
                <img
                  src={
                    details.userID.ConsumerProfile
                      ? `${details.userID.ConsumerProfile}`
                      : "./NoImage.kpg"
                  }
                  alt="Rejected Package Profile"
                  style={{ objectFit: "contain" }}
                />
                <h3>{details.packageID.packageName}</h3>
                <p>{details.remarks}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sections-box" style={{ width: "90%" }}>
          <h2>Package Approvals</h2>
          <div className="packages-box">
            {approvalDetails?.length > 0 ? (
              <React.Fragment>
                {approvalDetails?.map((approval) => (
                  <>
                    {approval.packageDetails?.map((details) => (
                      <div className="actual-package-box" key={details._id}>
                        {isReject === details.packageID._id ? (
                          <React.Fragment>
                            <div
                              className="reply-details"
                              style={{ marginTop: "1rem" }}
                            >
                              <textarea
                                name="rejectRemarks"
                                value={rejectedRemarks}
                                placeholder="Enter remarks why you are rejecting package"
                                onChange={(e) => setRemarks(e.target.value)}
                              />
                              <button
                                onClick={() =>
                                  Submit(
                                    details.packageID._id,
                                    approval.userID._id
                                  )
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <img
                              src={
                                details.packageID.packageProfile
                                  ? `${details.packageID.packageProfile}`
                                  : "./NoImage.jpg"
                              }
                              alt="Package Profile"
                            />

                            <div className="basic-info">
                              <img
                                src={
                                  approval.ispID.ispProfile
                                    ? `${approval.ispID.ispProfile}`
                                    : "./NoImage.jpg"
                                }
                                alt="ISP Profile"
                              />
                              <div>
                                <h3>{details.packageID.packageName}</h3>
                                <h5>{approval.ispID.ispName}</h5>
                              </div>
                            </div>

                            <img
                              src="./dropdown.svg"
                              alt="Drop Down Icon"
                              style={{ width: "30px", height: "30px" }}
                              className="dropDown"
                              onClick={() =>
                                setSeeDetails(details.packageID._id)
                              }
                            />

                            {seeDetails === details.packageID._id ? (
                              <React.Fragment>
                                <div className="further-info">
                                  <h4>
                                    Name:{" "}
                                    <span>{approval.userID.firstName}</span>
                                  </h4>
                                  <h4>
                                    Mobile No:{" "}
                                    <span>{approval.userID.phoneNo}</span>
                                  </h4>
                                  <h4>Address:</h4>
                                  <p>{details.connectionAddress}</p>
                                </div>

                                <div className="btn">
                                  <button
                                    onClick={() => handleApprove(details._id)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      setIsReject(details.packageID?._id)
                                    }
                                  >
                                    Reject
                                  </button>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </React.Fragment>
                        )}
                      </div>
                    ))}
                  </>
                ))}
              </React.Fragment>
            ) : (
              <p>There are no packages for approval</p>
            )}
          </div>
        </div>

        <div className="sections-box" style={{ width: "90%" }}>
          <h2>Payment Approvals</h2>
          {payementDetails?.length > 0 ? (
            <React.Fragment>
              <div className="packages-box">
                {payementDetails?.map((receipt) => (
                  <div className="actual-package-box" key={receipt._id}>
                    <img
                      src={
                        receipt.payment_receipt
                          ? `http://localhost:9002/PaymentReceipts/${receipt.payment_receipt}`
                          : "./NoImage.jpg"
                      }
                      alt="Payment Receipt"
                      style={{ objectFit: "contain" }}
                    />

                    <div className="basic-info">
                      <h3>
                        You've got payment from {receipt.userID.firstName} for:
                      </h3>
                    </div>

                    {receipt.packageDetails?.map((pckg) => (
                      <div className="further-info">
                        <h4>
                          Package Name: <span>{pckg.packageID.packageName}</span>
                        </h4>
                      </div>
                    ))}

                    <button
                      style={{
                        margin: "0.2rem 1rem",
                        fontWeight: "100",
                        fontFamily: "auto",
                        fontSize: "larger",
                        borderRadius: "6px",
                      }}
                      onClick={() => Acknowledge(receipt._id)}
                    >
                      Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            <p>There are no receipts for approval</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PackageApproval;
