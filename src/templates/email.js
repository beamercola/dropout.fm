import React from "react";
import { graphql } from "gatsby";
import {
  render,
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
  MjmlText,
  MjmlSpacer,
} from "mjml-react";

const textAttributes = {
  fontFamily: "'Andale Mono', CourierNewPSMT, monospace",
  "line-height": "20px",
};

const EmailTemplate = ({ data }) => {
  const { data: mix } = data.mix;
  const tracks = data.tracks.nodes.map(t => t.data);

  const { html } = render(
    <Mjml>
      <MjmlBody backgroundColor="#fff">
        <MjmlSection>
          <MjmlColumn>
            <MjmlText {...textAttributes}>
              happy saturday
              <br />
              it's {mix.Weather}
              <br />
              <br />
              thanks for subscribing, hmu on twitter (@beamercola)
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          <MjmlColumn>
            <MjmlImage align="left" src={mix.Image[0].url} alt="" />
          </MjmlColumn>
          <MjmlColumn>
            <MjmlText {...textAttributes}>
              {mix.Message.split("\n").map((item, key) => (
                <React.Fragment key={key}>
                  {item}
                  <br />
                </React.Fragment>
              ))}
            </MjmlText>
            <MjmlSpacer height="50px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText {...textAttributes}>
              <a
                href={`https://dropout.fm/week/${mix.Slug}`}
                target="_blank"
                {...textAttributes}
              >
                &#9658;{" Click here to listen to playlist"}
              </a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection>
          {tracks.map(track => (
            <MjmlColumn width="50%" key={track.Title}>
              <MjmlImage
                align="left"
                width="150px"
                height="150px"
                href={`https://dropout.fm/${track.Slug}`}
                src={track.Cover[0].url}
              />
              <MjmlText {...textAttributes}>
                <a
                  href={`https://dropout.fm/${track.Slug}`}
                  {...textAttributes}
                >
                  <MjmlText {...textAttributes}>{track.Title}</MjmlText>
                </a>
                <br />
                {track.Artist}
                <br />
                {track.Album} ({track.Year})
              </MjmlText>
            </MjmlColumn>
          ))}
          <mj-column width="50%"></mj-column>
        </MjmlSection>
      </MjmlBody>
    </Mjml>,
    { beautify: false, minify: false }
  );

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default EmailTemplate;

export const pageQuery = graphql`
  query EmailTemplate($slug: String!, $recordId: String!) {
    mix: airtable(data: { Slug: { eq: $slug } }) {
      recordId
      data {
        Date
        Message
        Slug
        Weather
        Image {
          url
        }
      }
    }
    tracks: allAirtable(
      filter: { data: { Mix: { eq: $recordId } } }
      sort: { fields: data___Date, order: ASC }
    ) {
      nodes {
        data {
          Album
          Artist
          Date
          Title
          Slug
          Year
          File
          Cover {
            url
          }
        }
      }
    }
  }
`;
