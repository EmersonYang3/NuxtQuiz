<template>
  <footer class="bg-gray-950 text-white border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Company Info -->
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">🥭</span>
            </div>
            <span
              class="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              67Quizzes
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            MANGO MANGO MANGO MANGO MANGO MANGO
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              :aria-label="social.name"
            >
              <component
                :is="social.icon"
                class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Product</h3>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link.name">
              <a
                :href="link.url"
                class="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
              >
                <span
                  class="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300 mr-0 group-hover:mr-2"
                ></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">Resources</h3>
          <ul class="space-y-3">
            <li v-for="link in resourceLinks" :key="link.name">
              <a
                :href="link.url"
                class="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
              >
                <span
                  class="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300 mr-0 group-hover:mr-2"
                ></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter & Contact -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-white">
            If You're A Girl, Fill Out
          </h3>
          <p class="text-gray-400 text-sm">We Need ABGS and Snow Bunnies</p>

          <!-- Newsletter Form -->
          <form @submit.prevent="subscribeNewsletter" class="space-y-3">
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your phone number"
                required
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <MailIcon
                class="absolute right-3 top-3.5 w-4 h-4 text-gray-500"
              />
            </div>
            <button
              type="submit"
              :disabled="isSubscribing"
              class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {{ isSubscribing ? "Subscribing..." : "Subscribe" }}
            </button>
          </form>

          <!-- Contact Info -->
          <div class="space-y-3 pt-4 border-t border-gray-800">
            <div class="flex items-center space-x-3">
              <MapPinIcon class="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span class="text-gray-400 text-sm">Cleveland, OH</span>
            </div>
            <div class="flex items-center space-x-3">
              <PhoneIcon class="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span class="text-gray-400 text-sm">911</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-800 py-8">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6"
          >
            <p class="text-gray-500 text-sm">
              © {{ currentYear }} 67Quizzes. All rights reserved.
            </p>
            <div class="flex space-x-6">
              <a
                v-for="link in legalLinks"
                :key="link.name"
                :href="link.url"
                class="text-gray-500 hover:text-gray-300 transition-colors text-sm"
              >
                {{ link.name }}
              </a>
            </div>
          </div>

          <!-- Back to Top -->
          <button
            @click="scrollToTop"
            class="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span class="text-sm">Back to top</span>
            <ArrowUpIcon
              class="w-4 h-4 transform group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
  ArrowUpIcon,
} from "lucide-vue-next";

const email = ref("");
const isSubscribing = ref(false);

const currentYear = computed(() => new Date().getFullYear());

const socialLinks = [
  { name: "Twitter", icon: TwitterIcon, url: "#" },
  { name: "Instagram", icon: InstagramIcon, url: "#" },
  {
    name: "Youtube",
    icon: YoutubeIcon,
    url: "https://www.youtube.com/user/dufeyn",
  },
];

const productLinks = [
  { name: "Features", url: "#" },
  { name: "Pricing", url: "#" },
  { name: "Integrations", url: "#" },
  { name: "API", url: "#" },
  { name: "Documentation", url: "#" },
];

const resourceLinks = [
  { name: "Blog", url: "#" },
  { name: "Help Center", url: "#" },
  { name: "Community", url: "#" },
  { name: "Tutorials", url: "#" },
  { name: "Status", url: "#" },
];

const legalLinks = [
  { name: "Privacy", url: "#" },
  { name: "Terms", url: "#" },
  { name: "Cookies", url: "#" },
];

// Methods
const subscribeNewsletter = async () => {
  if (!email.value) return;

  isSubscribing.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter subscription:", email.value);
    email.value = "";
    // You could add a success toast here
  } catch (error) {
    console.error("Subscription failed:", error);
    // You could add an error toast here
  } finally {
    isSubscribing.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
