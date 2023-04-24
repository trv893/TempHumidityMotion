#include <Ethernet.h>
#include <SPI.h>
#include <DHT.h>

// Replace with your own Ethernet MAC and IP address
byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192, 168, 50, 77);

// Replace with your server's IP and port
IPAddress server(192, 168, 50, 230);
int port = 80;

EthernetClient client;
DHT dht(2, DHT11);

int motionSensorPin = 7;
int ledPin = 5;

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(motionSensorPin, INPUT);
  pinMode(ledPin, OUTPUT);

  // Start the Ethernet connection
  Ethernet.begin(mac, ip);
  delay(1000);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int motion = digitalRead(motionSensorPin);

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if (client.connect(server, port)) {
    String data = "temperature=" + String(temperature) + "&humidity=" + String(humidity) + "&motion=" + String(motion);
    client.println("POST /your_endpoint HTTP/1.1");
    client.println("Host: your_server");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println();
    client.print(data);

    digitalWrite(ledPin, LOW); // Turn off the LED
  } else {
    digitalWrite(ledPin, HIGH); // Turn on the LED
  }

  client.stop();
  delay(10000); // Wait 10 seconds before sending data again
}
