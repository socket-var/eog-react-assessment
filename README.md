## Create React App Visualization

This assessment was bespoke handcrafted for Saketh.

Read more about this assessment [here](https://react.eogresources.com)

## Requirements

- [x] Metric List and Values
      You can select metrics, it loads from the API. When selected, the values auto update

- [x] Charting behaves like you would expect
      Good y axis scaling, has an info hover box with values. Looks nice.

- [x] Good Git/GitHub Practices
      Don't file Upload with 1 commit. Do have good commit messages.

- [x] You use and run our getting started code
      Some peope don't. ¯\_(ツ)\_/¯

- [x] Coding Standards
      Use AirBNB style with ES6/7/2015 features

## Bonus Points

- [x] Use React Hooks
      Shows you stay current.

- [x] Runs free of console warnings
      If React is warning you of something, you should fix it.

- [x] Handling Errors
      Reconnect websockets, toast an error if received.

- [x] Use Redux
      Store your values in redux.

- [x] Use Prettier
      We use prettier to auto format code and so should you :)

- [x] GraphQL Subscriptions
      Spending the time to subscribe to updates, instead of polling is 100

- [x] TypeScript
      Not all of our projects use typescript, but some do. If you love it, flaunt it.

- [x] Creativity
      Design choices? Something super cool? A++

  **Design choice:** I've seperated the historical and live charts using a toggle. From my first impression, `recharts` doesn't seem to be cut out well for realtime data to co-exist with historical data as rechart seems to be only good at rendering the entire data at a time and doesn't support streaming well.

  In retrospect, I should've used something like `react-timeseries-charts` which seems to focus on time series data and streaming but given the amount of time I allocated this seemed like a reasonable trade-off.

## Screen recording:

https://www.loom.com/share/04738c85c79f4901aa3ade9e4b58bf1b

## Closing remarks:

Just wanted to say thank you for putting so much thought into making this assessment! The instructions and the starter project have made it so easy for me to get started.
