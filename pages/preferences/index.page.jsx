import Head from "next/head";

import InternalLayout from "@/components/layout/InternalLayout";
import Heading from "@/components/typography/Heading";
import Panel from "@/components/layout/Panel";
import SpacePreference from "@/components/layout/SpacePreference";
import ThemePreference from "@/components/layout/ThemePreference";
import Container from "@/components/layout/Container";

import { headTags } from "@/utils/seo";

const Preferences = () => {
  return (
    <>
      <Head>
        {headTags({
          title: "Preferences Page",
        })}
      </Head>
      <InternalLayout headerTitle="Set your preferences">
        <div className="grow">
          <Container>
            <Heading size={1}>Preferences</Heading>
            <div className="grid grid-cols-1 gap-8 mb-10">
              <Panel title="Theme selector">
                <ThemePreference />
              </Panel>
              <Panel title="Space selector">
                <SpacePreference />
              </Panel>
            </div>
          </Container>
        </div>
      </InternalLayout>
    </>
  );
};

export default Preferences;
