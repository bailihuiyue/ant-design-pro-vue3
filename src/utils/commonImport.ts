import { useStore } from 'vuex';
import ls from '@/utils/Storage';
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';


const store = useStore();
const router = useRouter();

export { useStore, ls, defineComponent, ref, reactive, useRouter, store, router }
