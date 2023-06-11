<?php
/**
 * @package Boilerplate
 * @subpackage boilerplate_theme
 * @since Boilerplate Theme 1.0
 */

    //__________________________ Declare WooCommerce support __________________________
    //_________________________________________________________________________________

    add_action( 'after_setup_theme', 'woocommerce_support' );
    function woocommerce_support() {
        add_theme_support( 'woocommerce' );
    }
?>