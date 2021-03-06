import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    addToMailchimp(this.state.email).then(data => {
      this.setState({ data: data });
    });
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <form
        className={`${this.props.className} dark:text-gray-600`}
        onSubmit={this.handleSubmit.bind(this)}
      >
        <label className={`${this.props.labelClassName} text-xs mb-2 block`}>
          join the newsletter, saturday mornings
        </label>
        <div
          className={`card relative dark:bg-gray-800 ${this.props.inputClassName}`}
        >
          <input
            className="h-12 w-auto dark:bg-gray-800 dark:text-white px-3 z-10 w-full"
            type="email"
            placeholder="email address"
            onChange={this.handleChange.bind(this)}
          />
          <button
            className="p-2 bg-black text-white dark:text-gray-500 rounded absolute inset-y-0 right-0 m-1 z-20 text-xs leading-none cursor-pointer"
            type="submit"
          >
            submit
          </button>
        </div>
        {this.state.data && this.state.data.msg && (
          <p
            className="text-xs mt-2 px-3"
            dangerouslySetInnerHTML={{ __html: this.state.data.msg }}
          ></p>
        )}
      </form>
    );
  }
}
