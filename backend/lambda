import boto3
import json
from botocore.exceptions import ClientError

# Initialize the DynamoDB resource with region 'us-east-1'
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

# Reference the 'VisitorsTable' DynamoDB table
dynamodb_table = dynamodb.Table('VisitorsTable')

# Define the path for visitor count
visitor_count_path = '/visitorcount'

def lambda_handler(event, context):
    try:
        dynamodbResponse = dynamodb_table.update_item(
                Key={
                    'id': 'visitor_count'
                },
                UpdateExpression='SET visitors = visitors + :val1',
                ExpressionAttributeValues={
                    ':val1': 1
                },
                ReturnValues='UPDATED_NEW'
            )
            
        responseBody = json.dumps({"count":int(dynamodbResponse['Attributes']['visitors'])})

    except:
        putItem = dynamodb_table.put_item(
            Item = {
                'id': 'visitor_count',
                'visitors': 1
            }
        )

        dynamodbResponse = dynamodb_table.get_item(
            Key = {
                'id': 'visitor_count',
                'visitors': 1
            }
        )

        responseBody = json.dumps({"count":int(dynamodbResponse['Item']['visitors'])})

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
