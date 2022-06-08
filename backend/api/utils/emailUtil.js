// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });
exports.handler = async function (event) {
  var params = {
    Destination: {
      ToAddresses: ["recepient@email.com"],
    },
    Message: {
      Body: {
        Text: { Data: "WTP Booking Confirmation, Hi your booking for the party has been confirmed. We are looking forward your presence. Once again thanks for using WTP                                           Regards, WTP team"
        
        },
      },

      Subject: { Data: "Hi your booking for the party has been confirmed " },
    },
    Source: "no-reply@demo.vinothmani.me",
  };
 
  return ses.sendEmail(params).promise()
};