from flask import jsonify, make_response


def responseWithMessage(message, codeResponse):
    response = make_response(
        jsonify(
            {"message": message}
        ),
        codeResponse,
    )
    response.headers["Content-Type"] = "application/json"
    return response


def responseWithObject(object, codeResponse):
    response = make_response(
        jsonify(
            object
        ),
        codeResponse,
    )
    response.headers["Content-Type"] = "application/json"
    return response
