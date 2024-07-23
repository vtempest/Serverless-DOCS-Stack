<script lang="ts">
  import { APP_NAME } from "$configs/general";
  import { route } from "$lib/ROUTES";
</script>

<div class="py-8 lg:py-16">
  <div class="text-bold text-center text-3xl">Terms and Conditions</div>
  <div class="mt-4">
    <div>Welcome to {APP_NAME} ("we", "us", or "our"). These terms and conditions ("Terms") govern your use of our website and platform.</div>
    <div>By accessing or using our website and platform, you agree to be bound by these Terms.</div>
    <div>If you do not agree to these Terms, please do not access or use our website and platform.</div>
  </div>

  <div class="mt-6 text-lg font-bold">1. Use of Our Services</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">License</div>
      <div>
        Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use our platform for your personal or
        internal business purposes.
      </div>
    </li>
    <li>
      <div class="font-bold">Account</div>
      <div>You may be required to create an account to access certain features of our platform.</div>
      <div>
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
      </div>
    </li>
    <li>
      <div class="font-bold">Prohibited Activities</div>
      <div>
        You agree not to engage in any prohibited activities, including but not limited to:
        <ul class="ml-6 list-disc [&>li]:mt-2">
          <li>attempting to gain unauthorized access to our platform or systems;</li>
          <li>interfering with the operation of our platform;</li>
          <li>using our platform for illegal purposes;</li>
          <li>infringing the intellectual property rights of others;</li>
          <li>violating any applicable laws or regulations</li>
        </ul>
      </div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">2. Intellectual Property</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">Ownership</div>
      <div>
        All content and materials available on our website and platform, including but not limited to text, graphics, logos, and software, are the
        property of {APP_NAME} or its licensors and are protected by copyright and other intellectual property laws.
      </div>
    </li>
    <li>
      <div class="font-bold">License Grant</div>
      <div>You retain ownership of any data or content you submit or upload to our platform.</div>
      <div>
        By submitting or uploading content, you grant us a worldwide, royalty-free, non-exclusive license to use, reproduce, modify, adapt, publish,
        translate, distribute, and display such content for the purpose of providing our services.
      </div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">3. Privacy</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">Privacy Policy</div>
      <div>
        Your use of our website and platform is subject to our <a href={route("/legal/privacy-policy")} class="hover:underline">Privacy Policy</a>,
        which explains how we collect, use, and disclose your personal information.
      </div>
      <div>
        By using our website and platform, you consent to the collection and use of your personal information as described in our <a
          href={route("/legal/privacy-policy")}
          class="hover:underline"
        >
          Privacy Policy
        </a>.
      </div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">4. Disclaimer of Warranties</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">As Is Basis</div>
      <div>
        Our website and platform are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied.
      </div>
      <div>We do not warrant that our website and platform will be uninterrupted, error-free, or free of viruses or other harmful components.</div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">5. Limitation of Liability</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">Exclusion of Damages</div>
      <div>
        In no event shall {APP_NAME} be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your
        use of our website and platform, even if we have been advised of the possibility of such damages.
      </div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">6. Changes to These Terms</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">Modification</div>
      <div>We reserve the right to modify or revise these Terms at any time, in our sole discretion.</div>
      <div>We will notify you of any material changes to these Terms by posting the updated Terms on our website.</div>
      <div>
        Your continued use of our website and platform after the effective date of the revised Terms constitutes your acceptance of the changes.
      </div>
    </li>
  </ul>

  <div class="mt-6 text-lg font-bold">7. Contact Us</div>
  <ul class="ml-6 list-disc [&>li]:mt-2">
    <li>
      <div class="font-bold">Questions</div>
      <div>If you have any questions or concerns about these Terms, please contact.</div>
    </li>
  </ul>
</div>
