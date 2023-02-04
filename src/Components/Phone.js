import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { metadata } from 'libphonenumber-js';

function Phone() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState();
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      metadata={metadata}
    />
  );
}

export default Phone;
