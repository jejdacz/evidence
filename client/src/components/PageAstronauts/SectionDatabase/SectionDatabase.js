import React from "react";
import { Section, Container, Heading, Paragraph, Group } from "../Main/Main.js";
import Button from "../../controls/Button.js";

const SectionDatabase = ({ children }) => (
  <Section id="database">
    <Container>
      <Heading>Database</Heading>
      <Group>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas
          libero. Integer malesuada. Cum sociis natoque penatibus et magnis dis
          parturient montes.Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit. Maecenas libero. Integer malesuada. Cum sociis natoque penatibus
          et magnis dis parturient montes.
        </Paragraph>
        <Button>add astronaut</Button>
      </Group>
      <Group>{children}</Group>
    </Container>
  </Section>
);

export default SectionDatabase;