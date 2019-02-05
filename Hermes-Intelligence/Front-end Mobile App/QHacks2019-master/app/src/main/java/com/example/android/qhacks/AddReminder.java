package com.example.android.qhacks;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;

public class AddReminder extends AppCompatActivity {

    private String cronString;

    private ImageButton imageButton1;
    private ImageButton imageButton2;
    private ImageButton imageButton3;
    private ImageButton imageButton4;

    private int spinner1Int;
    private int spinner2Int;
    private int spinner3Int;
    private int spinner4Int;

    private ImageButton EnterInformation;

    private String phoneNumber = "";
    private String resultText = "";

    private static final int REQUEST_READ_PHONE_STATE = 0;

    // SPINNER 1 IS FOR START HOUR, SPINNER 5 IS END DATE

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addreminder);


        Spinner dropdown = findViewById(R.id.spinner1);     // spinner1 is either position 0 or 1, text or navigation
        //create a list of items for the spinner.

        String[] items = new String[]{"Text", "Navigation"};

        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items);

        dropdown.setAdapter(adapter);




        Spinner dropdown2 = findViewById(R.id.spinner2);    // spinner2 is hour
        //create a list of items for the spinner.
        String[] items2 = new String[]{"*", "00", "01","02","03","04","05","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"};

        ArrayAdapter<String> adapter2 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items2);
        dropdown2.setAdapter(adapter2);


        Spinner dropdown3 = findViewById(R.id.spinner3);    // spinner3 is minute
        //create a list of items for the spinner.
        String[] items3 = new String[]{"*", "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"};
        //create an adapter to describe how the items are displayed, adapters are used in several places in android.
//There are multiple variations of this, but this is the basic variant.
        ArrayAdapter<String> adapter3 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items3);
//set the spinners adapter to the previously created one.
        dropdown3.setAdapter(adapter3);


        Spinner dropdown4 = findViewById(R.id.spinner4);    //spinner4 is start day
        //create a list of items for the spinner.
        String[] items4 = new String[]{"*", "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
        //create an adapter to describe how the items are displayed, adapters are used in several places in android.
//There are multiple variations of this, but this is the basic variant.
        ArrayAdapter<String> adapter4 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items4);
//set the spinners adapter to the previously created one.
        dropdown4.setAdapter(adapter4);




        Spinner dropdown5 = findViewById(R.id.spinner5);    //spinner5 is end day
        //create a list of items for the spinner.
        String[] items5 = new String[]{"*", "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
        //create an adapter to describe how the items are displayed, adapters are used in several places in android.
//There are multiple variations of this, but this is the basic variant.
        ArrayAdapter<String> adapter5 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, items5);
//set the spinners adapter to the previously created one.
        dropdown5.setAdapter(adapter5);


        imageButton1 =  findViewById(R.id.imageButton1);

        imageButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Start your second activity
                Intent intent = new Intent(AddReminder.this, AddReminder.class);
                startActivity(intent);
            }
        });

        imageButton2 =  findViewById(R.id.imageButton2);

        imageButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Start your second activity
                Intent intent = new Intent(AddReminder.this, Reminders.class);
                startActivity(intent);
            }
        });

        imageButton3 =  findViewById(R.id.imageButton3);

        imageButton3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Start your second activity
                Intent intent = new Intent(AddReminder.this, Navigation.class);
                startActivity(intent);
            }
        });

        imageButton4 =  findViewById(R.id.imageButton4);

        imageButton4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Start your second activity
                Intent intent = new Intent(AddReminder.this, Settings.class);
                startActivity(intent);
            }


        });


        dropdown2.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id){
                if (position == 0)
                    spinner1Int = -1;
                else if (position <= 23)
                    spinner1Int = position-1;
                else
                    spinner1Int = 0;

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent){

            }
        });


        dropdown3.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id){

                if (position == 0)
                    spinner2Int = -1;
                else if(position <= 59)
                    spinner2Int = position-1;
                else
                    spinner2Int = 0;

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent){

            }

        });

        dropdown4.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id){

                if (position == 0)
                    spinner3Int = -1;
                else if(position <= 6)
                    spinner3Int = position-1;
                else
                    spinner3Int = 0;

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent){

            }

        });

        dropdown5.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener(){

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id){

                if (position == 0)
                    spinner4Int = -1;
                else if(position <= 6)
                    spinner4Int = position-1;
                else
                    spinner4Int = 0;

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent){

            }

        });


        EnterInformation =  findViewById(R.id.enterButtonReminder);

        EnterInformation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String spin1 = ""; // hour
                String spin2 = ""; // minute
                String spin3 = ""; // start day
                String spin4 = ""; // end day

                boolean checked = false;

                if (spinner1Int == -1) {
                    spin1 = "*";
                }
                if (spinner2Int == -1) {
                    spin2 = "*";
                }
                if (spinner3Int == -1) {
                    spin3 = "*";
                    checked = true;
                }
                if (spinner4Int == -1) {
                    spin4 = "*";
                    checked = true;
                }

                if (!checked && spinner4Int == 0){ // if the end date is Sunday, set cron to 7
                    spinner4Int = 7;
                }

                if (!checked && spinner3Int == spinner4Int){    // if the start and end dates are the same day, last value of cron is either the start or end date
                    spin1 = Integer.toString(spinner1Int);
                    spin2 = Integer.toString(spinner2Int);
                    spin3 = Integer.toString(spinner3Int);

                    cronString = spin2 + " " + spin1 + " * " + "* " + spin3;
                }

                if(!checked && spinner3Int != spinner4Int){
                    spin1 = Integer.toString(spinner1Int);
                    spin2 = Integer.toString(spinner2Int);
                    spin3 = Integer.toString(spinner3Int);
                    spin4 = Integer.toString(spinner4Int);

                    cronString = spin2 + " " + spin1 + " * " + "* " + spin3 + "-" + spin4;
                }

                if (checked) {
                    if (!spin1.equals("*")) {
                        spin1 = Integer.toString(spinner1Int);
                    }
                    if (!spin2.equals("*")) {
                        spin2 = Integer.toString(spinner2Int);
                    }
                    if (!spin3.equals("*")) {
                        spin3 = Integer.toString(spinner3Int);
                    }
                    if (!spin4.equals("*")) {
                        spin4 = Integer.toString(spinner4Int);
                    }

                    cronString = spin2 + " " + spin1 + " * " + "* " + spin3;
                }
                Log.e("Cron String:",  cronString);

                EditText StartAddress = findViewById(R.id.enterStartAddress);
                EditText EndAddress = findViewById(R.id.enterEndAddress);

                String fromAddress = StartAddress.getText().toString();
                String toAddress = EndAddress.getText().toString();
                String phone = "";
                Bundle extras = getIntent().getExtras();
                if (extras != null) {
                    phone = extras.getString("phone");
                }

                String outText = "database create " + phone + " (" + fromAddress + ") " + "(" + toAddress + ") " + cronString;
                Log.e("FULL TEXT", outText);
                phoneNumber = phone;
                resultText = outText;

//                sendSMSMessage();

                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage("16137016470", null, resultText, null, null);
//                String scAddress = null;
//                PendingIntent sentIntent = null, deliveryIntent = null;
//                SmsManager smsManager = SmsManager.getDefault();
//                smsManager.sendTextMessage
//                        (phone, scAddress, outText,
//                                sentIntent, deliveryIntent);

            }
        });
    }

    protected void sendSMSMessage() {

        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.SEND_SMS)
                != PackageManager.PERMISSION_GRANTED) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.SEND_SMS)) {
                Log.e("Test", "Test1");
            } else {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.SEND_SMS},
                        REQUEST_READ_PHONE_STATE);
                Log.e("Test", "Test2");
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,String permissions[], int[] grantResults) {
        Log.e("Test", "Test");
        switch (requestCode) {
            case REQUEST_READ_PHONE_STATE: {
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    SmsManager smsManager = SmsManager.getDefault();
                    smsManager.sendTextMessage(phoneNumber, null, resultText, null, null);
                    Log.e("Accepted", "Permission Accepted");
                } else {
                    Log.e("Denied", "Permission Denied");
                    return;
                }
            }
        }

    }

}
