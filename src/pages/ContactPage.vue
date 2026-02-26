<template>
    <div class="main-container">
        <div class="b-padding vertical-container mid-aligner">
            <div>
                <h4 class="title-font">Fill out this form to contact us</h4>
                <p class="text">(Any off-topic contact will be ignored)</p>
            </div>
            <SignComponent content="This section is still under construction." />
            <form ref="formRef" class="vertical-container mid-aligner m-separator form-all-width"
                @submit.prevent="onSubmit">
                <div class="vertical-container s-separator start-aligner use-all-width">
                    <label for="name" class="text">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name Here" />
                </div>
                <div class="vertical-container s-separator start-aligner use-all-width">
                    <label for="email" class="text">Email</label>
                    <input type="email" id="email" name="email" placeholder="Example: myemailaddress@gmail.com"
                        required />
                </div>
                <div class="vertical-container s-separator start-aligner use-all-width">
                    <label for="issue" class="text">Issue</label>
                    <input type="text" id="issue" name="issue" placeholder="Example: Report Bug on [Name Game]" />
                </div>
                <div class="vertical-container s-separator start-aligner use-all-width">
                    <label for="message" class="text">Message</label>
                    <textarea type="text" id="message" name="message" placeholder="Example: Hi ImpStructors Studio!"
                        required></textarea>
                </div>

                <ButtonComponent content="Send" type="submit" icon="/images/icons/send_icon.svg" color="white" />
            </form>

            <div class="card-slot-container mid-aligner">
                <p class="text">Or, you can also contact us by email.</p>
                <ButtonComponent content="Email" href="mailto:nullitystudio1@gmail.com" color="blue"
                    icon="/images/icons/email_icon.svg" />
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from '@components/ButtonComponent.vue'
import SignComponent from '@components/SignComponent.vue';
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    background-color: var(--primary-color);

    min-height: 100vh;
    width: 100%;
}

.form-all-width {
    width: 100%;
    max-width: 600px;
}
</style>
