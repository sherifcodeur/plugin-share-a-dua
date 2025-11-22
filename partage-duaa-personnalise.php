<?php
/**
 * Plugin Name: Partage Duaa Personnalisé
 * Description: Bloc Gutenberg pour partager le premier texte au-dessus avec la classe "letexto", même dans des groupes.
 * Version: 1.1
 * Author: Toi
 */

if (!defined('ABSPATH')) {
    exit;
}

function enqueue_partage_duaa_block() {
    wp_enqueue_script(
        'partage-duaa-script',
        plugin_dir_url(__FILE__) . 'script.js',
        array('wp-blocks', 'wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'script.js')
    );

    wp_enqueue_style(
        'partage-duaa-style',
        plugin_dir_url(__FILE__) . 'style.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_partage_duaa_block');

function enqueue_partage_duaa_frontend() {
    wp_enqueue_script(
        'partage-duaa-frontend',
        plugin_dir_url(__FILE__) . 'script.js',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'script.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_partage_duaa_frontend');