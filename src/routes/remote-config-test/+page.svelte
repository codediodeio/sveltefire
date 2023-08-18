<script lang="ts">
  import RemoteConfig from "$lib/components/remote-config/RemoteConfig.svelte";
  import RemoteConfigBoolean from "$lib/components/remote-config/RemoteConfigBoolean.svelte";
  import RemoteConfigNumber from "$lib/components/remote-config/RemoteConfigNumber.svelte";
  import RemoteConfigString from "$lib/components/remote-config/RemoteConfigString.svelte";
  import RemoteConfigValue from "$lib/components/remote-config/RemoteConfigValue.svelte";

  const testValue = {
    testString: "Hello World",
    testBoolean: true,
    testValue: 123,
    testNumber: 123.456,
  };
</script>

<h1>Remote Config Test</h1>

<RemoteConfig defaultValue={testValue} let:remoteConfig>
  <RemoteConfigString {remoteConfig} variableName="testString" let:configValue>
    <p data-testid="string-config">Remote Config String: {configValue}</p>
  </RemoteConfigString>

  <RemoteConfigBoolean {remoteConfig} variableName="testBoolean" let:configValue>
    <p data-testid="boolean-config">Remote Config Boolean: {configValue}</p>
  </RemoteConfigBoolean>

  <RemoteConfigNumber {remoteConfig} variableName="testNumber" let:configValue>
    <p data-testid="number-config">Remote Config Number: {configValue}</p>
  </RemoteConfigNumber>

  <RemoteConfigValue {remoteConfig} variableName="testValue" let:configValue>
    <p data-testid="value-config">Remote Config Value: {configValue.getSource()}</p>
  </RemoteConfigValue>
</RemoteConfig>