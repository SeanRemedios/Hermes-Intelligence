package com.example.android.qhacks;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;

public class EnterNumber extends AppCompatActivity {

    EditText phoneNumber; // User input box
    String FullPhoneNumber; // Stores the inputted number

    private ImageButton enterNumberStored;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enter_number);

        phoneNumber = findViewById(R.id.enter_number_edittext); // Input textbox for number

        enterNumberStored =  findViewById(R.id.enterButtonSmallXML); // Submits the number and proceeds to next page


        enterNumberStored.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

               FullPhoneNumber  = phoneNumber.getText().toString();

                Log.v("MYINT",  phoneNumber.getText().toString());

                Intent intent = new Intent(EnterNumber.this, Reminders.class);
                intent.putExtra("phone", FullPhoneNumber);

                startActivity(intent);
            }
        });



    }
}
