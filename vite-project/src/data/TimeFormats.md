A time value by default consists of an hour and a minutes value.
Both of these are numbers.
The hour value ranges from 0 to 24.
When the hour is 0 to 23, the minutes value can range from 0 to 59.
When the hour is 24, the minutes value must be 0.
Doing this allows the duration of a time period to be easily calculated.

Time values can be formatted as follows:
hour : minutes (two digits) AM/PM
hour = 0, minutes = 0 => START
hour = 24, minutes = 0 => END

Or as follows:
hour (two digits) : minutes (two digits)
