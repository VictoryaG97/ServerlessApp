import json


def response(status, body):
    """Formats a Lambda-compliant API response"""

    return {
        "statusCode": status,
        "body": json.dumps(body),
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        }
    }