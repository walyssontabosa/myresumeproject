import boto3
import json
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Reference the 'VisitorsTable' DynamoDB table
dynamodb_table = dynamodb.Table('VisitorsTable')

def lambda_handler(event, context):
    try:
        # First, try to get the current visitor count
        dynamodbResponse = dynamodb_table.get_item(
            Key={
                'id': 'visitor_count', 
                'visitors': 1
            }
        )

        # Check if the item exists
        if 'Item' not in dynamodbResponse:
            return {
                "isBase64Encoded": False,
                "statusCode": 404,
                "body": json.dumps({"error": "Visitor count item not found"})
            }

        # If the item exists, update the visitor count
        updatedResponse = dynamodb_table.update_item(
            Key={
               'id': 'visitor_count', 
                'visitors': 1
            },
            UpdateExpression='SET visitor_count = visitor_count + :val1',
            ExpressionAttributeValues={
                ':val1': 1
            },
            ReturnValues='UPDATED_NEW'
        )

        # Get the updated visitor count from the response
        responseBody = json.dumps({"count": int(updatedResponse['Attributes']['visitor_count'])})

    except ClientError as e:
        print(f"ClientError: {e.response['Error']['Message']}")
        return {
            "isBase64Encoded": False,
            "statusCode": 500,
            "body": json.dumps({"error": e.response['Error']['Message']})
        }

    apiResponse = {
        "isBase64Encoded": False,
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": responseBody
    }

    return apiResponse
