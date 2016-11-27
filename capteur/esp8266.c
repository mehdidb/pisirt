#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>

//create 1-wire connection on pin 2 and connect it to the dallasTemp library
OneWire oneWire(2);
DallasTemperature sensors(&oneWire);


//EDIT THESE LINES TO MATCH YOUR SETUP
#define MQTT_SERVER "192.168.1.7"
const char* ssid = "anis";
const char* password = "71757334";


//topic to publish to for the temperature
char* tempTopic = "/house/temp1";
char currentTemp[2];


WiFiClient wifiClient;
PubSubClient client(MQTT_SERVER, 1883, wifiClient);

void setup() {

  //null terminate the temp string to be published
  currentTemp[1] = '\0';

  //start the serial line for debugging
  client.setCallback(callback);
  Serial.begin(115200);
  delay(100);

 
  //start wifi subsystem
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  //attempt to connect to the WIFI network and then connect to the MQTT server
  reconnect();

  //start the temperature sensors
  sensors.begin();

  //wait a bit before starting the main loop
      delay(2000);
}
void reverse(char *str, int len)
{
    int i=0, j=len-1, temp;
    while (i<j)
    {
        temp = str[i];
        str[i] = str[j];
        str[j] = temp;
        i++; j--;
    }
}
 
 // Converts a given integer x to string str[].  d is the number
 // of digits required in output. If d is more than the number
 // of digits in x, then 0s are added at the beginning.
int intToStr(int x, char str[], int d)
{
    int i = 0;
    while (x)
    {
        str[i++] = (x%10) + '0';
        x = x/10;
    }
 
    // If number of digits required is more, then
    // add 0s at the beginning
    while (i < d)
        str[i++] = '0';
 
    reverse(str, i);
    str[i] = '\0';
    return i;
}

void ftoa(float n, char *res, int afterpoint)
{
    // Extract integer part
    int ipart = (int)n;
 
    // Extract floating part
    float fpart = n - (float)ipart;
 
    // convert integer part to string
    int i = intToStr(ipart, res, 0);
 
    // check for display option after point
    if (afterpoint != 0)
    {
        res[i] = '.';  // add dot
 
        // Get the value of fraction part upto given no.
        // of points after dot. The third parameter is needed
        // to handle cases like 233.007
        fpart = fpart * pow(10, afterpoint);
 
        intToStr((int)fpart, res + i + 1, afterpoint);
    }
}
void loop(){

  // Send the command to update temperatures
  sensors.requestTemperatures(); 

  //get the new temperature


 
  float currentTempFloat = sensors.getTempCByIndex(0);
  char currentTemp[20];
    ftoa(currentTempFloat, currentTemp, 4);
  //publish the new temperature
  client.publish(tempTopic, currentTemp);




  //reconnect if connection is lost
  if (!client.connected() && WiFi.status() == 3) {reconnect();}
  //maintain MQTT connection
  client.loop();
  //MUST delay to allow ESP8266 WIFI functions to run
  delay(5000); 
}


//MQTT callback
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
  }

//networking functions

void reconnect() {

  //attempt to connect to the wifi if connection is lost
  if(WiFi.status() != WL_CONNECTED){

    //loop while we wait for connection
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
    }

  }

  //make sure we are connected to WIFI before attemping to reconnect to MQTT
  if(WiFi.status() == WL_CONNECTED){
  // Loop until we're reconnected to the MQTT server
    while (!client.connected()) {

      // Generate client name based on MAC address and last 8 bits of microsecond counter
      String clientName;
      clientName += "esp8266-";
      uint8_t mac[6];
      WiFi.macAddress(mac);
      clientName += macToStr(mac);

      //if connected, subscribe to the topic(s) we want to be notified about
      if (client.connect((char*) clientName.c_str())) {
        //subscribe to topics here
      }
    }
  }
}

//generate unique name from MAC addr
String macToStr(const uint8_t* mac){

  String result;

  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);

    if (i < 5){
      result += ':';
    }
  }

  return result;
}
